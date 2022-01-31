using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//dfafadg
namespace BL
{
    public class Search
    {

        public static shiduchimEntities context;
        static Search()
        {
            context = new shiduchimEntities();
        }
        public static bool search(DetailsCandidate dc)
        {


            Dictionary<string, string> d = new Dictionary<string, string>();
            List<User> allUser = context.Users.Where(o => o.AllowAccess == 1).ToList();
            foreach (var item in allUser)//מעבר על כל המשתמשים
            {
                DetailsCandidate CurrentUser = CandidateUser.LoginCandidate(item);//הבאת כל פרטי המועמד הנוכחי
                if (CurrentUser.Candidate != null)
                    if (CurrentUser.Candidate.EnterIn == 2 && CurrentUser.User.Gender == !dc.User.Gender)//אם הוא מין המין הנוגד ןהוא במצב שאפשר לחפש לו
                    {

                        if (SuitAbleCrit(dc, CurrentUser) == true && SuitAbleCrit(CurrentUser, dc) == true)//אם הקריטריונים של שתיהם מתאימים אחד לשני
                        {

                          //  if (dc.User.Gender == true)
                 //               d.Add(dc.User.Tz, CurrentUser.User.Tz);
                 //           else
                              d.Add(CurrentUser.User.Tz, dc.User.Tz);
                        }
                    }
            }


           AddSuggestToMeetingTable(d, dc.User.Gender);
            if (d.Count() > 0)
                return true;
            return false;



        }

        public static void AddSuggestToMeetingTable(Dictionary<string, string> d, bool? gender)//הוספת הצעה לטבלת הצעות
        {
            string mail;

            foreach (var item in d)
            {
                Meeting m = new Meeting();
                if(gender==true)
                {
                    m.tzBride = item.Key;
                    m.tzGroom = item.Value;
                }
                else
                {
                    m.tzGroom = item.Key;
                    m.tzBride = item.Value;
                }
                m.tzGroom = item.Key;
                m.tzBride = item.Value;
                m.StatusBride = 1;
                m.StatusGroom = 1;
                m.KindMeeting = 0;
                context.Meetings.Add(m);
                context.SaveChanges();
                User u = context.Users.FirstOrDefault(p => p.Tz == m.tzGroom);
                mail = gender == true ? context.Users.FirstOrDefault(p => p.Tz == m.tzBride).Mail
                    : context.Users.FirstOrDefault(p => p.Tz == m.tzGroom).Mail;
                SendMail.addSuggesrToCandidateMail(mail);
            }
        }


        //dc מי שמחפסים לו שידות
        //currentUser מי שכרגע עוברים עליו ברשימה
        public static bool SuitAbleCrit(DetailsCandidate dc, DetailsCandidate CurrentUser)
        {
            foreach (var VLC in dc.ValueListCandidate.Where(o => o.isSelf == false))//מעבר על הקריטריונים של המועמד שמחפסים לו שידוך
            {
                int? hisVLC = null;
                if (getKindCriteron(VLC.CriteriaId) == 3)//אם זה ערך מספרי
                {
                    if (VLC.CriteriaId == 33)
                        hisVLC = new DateTime().Year - CurrentUser.User.BornDate?.Year;
                    else
                        hisVLC = CurrentUser.ValueListCandidate.FirstOrDefault(p => p.CriteriaId == VLC.CriteriaId && p.isSelf == true).selfValue;
                    if (hisVLC == null)
                        continue;
                    if (hisVLC < VLC.satisfacMinValue || hisVLC > VLC.satisfacMaxValue)
                        return false;
                }

                else if (VLC.CriteriaId == 32)//אם זה סוג מגבלה
                {
                    foreach (var mig in CurrentUser.MigbalaCandidates)
                    {
                        if (mig.KindMigbala == VLC.ValueListId)
                            return false;
                    }
                }
                else if (VLC.CriteriaId == 10)//אם זה מצב משפחתי 
                {
                    if (CurrentUser.User.Status==null)
                        continue;
                        if (CurrentUser.User.Status == VLC.ValueListId && VLC.isInclude == false
                        || CurrentUser.User.Status != VLC.ValueListId && VLC.isInclude == true)
                        return false;
                }

                else if (getKindCriteron(VLC.CriteriaId) == 1 && getIndex(VLC.ValueListId) != null)//המאונדקסים אם זה ערך מרשימת ערכים
                {
                    List<ValueListCandidateDTO> currentUserVL = CurrentUser.ValueListCandidate.Where(p => p.CriteriaId == VLC.CriteriaId && p.isSelf == true).ToList();
                    if (currentUserVL.Count() == 0)
                        continue;
                    var v = currentUserVL.FirstOrDefault(p => getIndex(VLC.ValueListId) < getIndex(p.ValueListId));
                    if (currentUserVL.FirstOrDefault(p => p.ValueListId == VLC.ValueListId) != null && VLC.isInclude == false ||
                        currentUserVL.Count() == 0 && VLC.isInclude == true ||
                        currentUserVL.FirstOrDefault(p => getIndex(VLC.ValueListId) < getIndex(p.ValueListId)) != null && VLC.isInclude == true)
                        return false;
                }
                else if (getKindCriteron(VLC.CriteriaId) == 1)//אם זה ערך מרשימת ערכים
                {
                    List<ValueListCandidateDTO> currentUserVL = CurrentUser.ValueListCandidate.Where(p => p.CriteriaId == VLC.CriteriaId && p.isSelf == true).ToList();
                    if (currentUserVL.Count() == 0)
                        continue;
                    if (currentUserVL.FirstOrDefault(p => p.ValueListId == VLC.ValueListId) != null && VLC.isInclude == false ||
                        currentUserVL.Count() == 0 && VLC.isInclude == true ||
                        currentUserVL.FirstOrDefault(p => p.ValueListId == VLC.ValueListId) == null && VLC.isInclude == true)
                        return false;
                }


                else if (getKindCriteron(VLC.CriteriaId) == 2)//אם זה ערך בוליאני
                {
                    if (CurrentUser.ValueListCandidate.FirstOrDefault(p => p.CriteriaId == VLC.CriteriaId && p.isSelf == true) == null)
                        continue;
                    if (VLC.satisfacBool != CurrentUser.ValueListCandidate.FirstOrDefault(p => p.CriteriaId == VLC.CriteriaId && p.isSelf == true).selfBool)
                        return false;
                }
            }
            return true;
        }

        public static int? getKindCriteron(int? critId)//(פונקציה זו מקבלת קוד קריטריון ומחזירה את הסוג שלו(מספרי/רשימת ערכים) =
        {
            return context.Criteria.FirstOrDefault(p => p.CriterionId == critId).KindCriterion;
        }

        public static int? getIndex(int? valueListId)//(פונקציה זו מקבלת קוד קריטריון ומחזירה את הסוג שלו(מספרי/רשימת ערכים) =
        {
            return context.ValueLists.FirstOrDefault(p => p.ValueListId == valueListId).Index1;
        }

    }


}
