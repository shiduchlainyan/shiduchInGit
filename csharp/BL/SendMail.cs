using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

using DAL;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.IO;
using System.Web;

namespace BL
{
    public class SendMail
    {
        public static shiduchimEntities context;
        static SendMail()
        {
            context = new shiduchimEntities();
            MailMessage ser = mail3("dddd", "dtfsfs", "6764804@gmail.com");
            Console.Write(ser);
        }

        public static MailMessage mail3(string text, string subject, string mailToSend, string filePath = null)
        {
            try
            {
                string mailSend = "shiduchlainyan@gmail.com";
                SmtpClient smtp = new SmtpClient();
                smtp.Host = " alt4.aspmx.l.google.com";
                smtp.Port = 587;
                smtp.UseDefaultCredentials = true;
                smtp.Credentials = new System.Net.NetworkCredential("shiduchlainyan@gmail.com", "ahsul123");// Enter senders User name and password
                smtp.EnableSsl = true;

                MailMessage mail = new MailMessage(mailSend, mailToSend , subject, text);
                if (filePath != null)
                {
             //http://localhost:62699/UploadFile/אפרת/ANTIQUE2.JPG
                    var path = HttpContext.Current.Server.MapPath("~");
                  
                   
                    path=path.Replace(@"\",@"/");
                    path += filePath.Substring(23);
                    
                    //mail.Attachments.Add(new Attachment(path));
                    mail.Attachments.Add(new Attachment(path));
                }
                mail.BodyEncoding = UTF8Encoding.UTF8;
                //mail.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;

                smtp.Send(mail);
            }
            catch (Exception ex)
            {
                var x = ex.Message;
                Console.WriteLine(x);
            }
            return new MailMessage();
        }



        public static void hagashatBakasha(DetailsCandidate dc)//שומרת פרטי מועמד ושולחת מייל לשדכן לקביעת פגישה
        {
            string subject = "פגישה עם שדכן";
            string text = " מועמד בשם  " + dc.User.FirstName + " " + dc.User.LastName + " בעל ת.ז. שמיספרה " + dc.User.Tz + " שלח הגשת בקשה לקביעת פגישת שדכן   ";
            CandidateUser.SaveDetailsCandidate(dc);
            mail3(text, subject, "shiduchlainyan@gmail.com");

        }
        //public void g(User u)
        //{
        //    mail3(u);

        //}
        public static void interestingSuggestMail(User u, string tz)//כאשר משתמש לחץ על כפתור מעונין בהצעה
        {

            User interesUser = context.Users.FirstOrDefault(p => p.Tz == tz);
            string subject = "מעונין בהצעה";
            string text = "מועמד בשם" + u.FirstName + " " + u.LastName + "בעל ת.ז.  " + u.Tz + "מעונין להפגש עם " + interesUser.FirstName + " " + interesUser.LastName + "בעל ת. ז. " + interesUser.Tz;
            mail3(text, subject, "shiduchlainyan@gmail.com");

        }

        public static void addSuggesrToCandidateMail(string mail)//כשנוספה הצעה חדשה למועמד
        {


            string subject = "שידוך לעינין";
            string text = "מועמד יקר שים לב יש לך הצעות חדשות בהצלחה!!!";
            mail3(text, subject, mail);

        }

        public static void closeMatch(string mailToSend)
        {
            string text = " לקוח יקר מערכת שידוך לעינין מאחלת לכם הרבה מזל טוב ושתזכו להקים בית נאמן בישראל";
            string subject = "שידוך לעינין";

            mail3(text, subject, mailToSend);
        }

        public static bool mailToCandidate(string subject, string text, string m, string tz)//שליחת מייל למועמד
        {

            User user = context.Users.FirstOrDefault(p => p.Tz == tz);
            if (user != null)
            {
                Candidate cand = context.Candidates.FirstOrDefault(p => p.UserId == user.UserId);
                if (cand.ImageCandidate == null || cand.ImageCandidate == "")
                    return false;
                mail3(text, subject, m, cand.ImageCandidate);
            }
            mail3(text, subject, m);
            return true;
        }

    }
}