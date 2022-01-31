//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class User
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public User()
        {
            this.Matchmakers = new HashSet<Matchmaker>();
            this.ValueListCandidates = new HashSet<ValueListCandidate>();
        }
    
        public int UserId { get; set; }
        public string Mail { get; set; }
        public string Password { get; set; }
        public string UserName { get; set; }
        public string Tz { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Nullable<System.DateTime> BornDate { get; set; }
        public Nullable<bool> Gender { get; set; }
        public string Cellphon { get; set; }
        public string Telephon { get; set; }
        public string CountryId { get; set; }
        public string CityId { get; set; }
        public string StreetId { get; set; }
        public Nullable<int> BuildNum { get; set; }
        public Nullable<int> AllowAccess { get; set; }
        public Nullable<int> Status { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Matchmaker> Matchmakers { get; set; }
        public virtual Profession Profession { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ValueListCandidate> ValueListCandidates { get; set; }
        public virtual Candidate Candidate { get; set; }
    }
}
