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
    
    public partial class Parent
    {
        public int ParentId { get; set; }
        public Nullable<int> UserId { get; set; }
        public Nullable<bool> Relativ { get; set; }
        public string BornCountryId { get; set; }
        public string MotzaCountryId { get; set; }
        public Nullable<int> ParentKind { get; set; }
        public Nullable<bool> Jew { get; set; }
        public string Describ { get; set; }
    
        public virtual Candidate Candidate { get; set; }
    }
}