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
    
    public partial class Hospitalization
    {
        public int HospitalizationId { get; set; }
        public Nullable<int> UserId { get; set; }
        public string NameDepartment { get; set; }
        public string TreatDoctor { get; set; }
        public string TelTreatDr { get; set; }
        public string NameHospital { get; set; }
        public Nullable<System.DateTime> FromDate { get; set; }
        public Nullable<System.DateTime> UntilDate { get; set; }
        public string Describ { get; set; }
    
        public virtual Candidate Candidate { get; set; }
    }
}
