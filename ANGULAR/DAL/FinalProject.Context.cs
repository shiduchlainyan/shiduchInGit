﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class shiduchimEntities : DbContext
    {
        public shiduchimEntities()
            : base("name=shiduchimEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Child> Children { get; set; }
        public virtual DbSet<Criterion> Criteria { get; set; }
        public virtual DbSet<Document> Documents { get; set; }
        public virtual DbSet<Hospitalization> Hospitalizations { get; set; }
        public virtual DbSet<Matchmaker> Matchmakers { get; set; }
        public virtual DbSet<Mechutanim> Mechutanims { get; set; }
        public virtual DbSet<Meeting> Meetings { get; set; }
        public virtual DbSet<MigbalaCandidate> MigbalaCandidates { get; set; }
        public virtual DbSet<PaymentsOfUser> PaymentsOfUsers { get; set; }
        public virtual DbSet<Profession> Professions { get; set; }
        public virtual DbSet<sysdiagram> sysdiagrams { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<ValueList> ValueLists { get; set; }
        public virtual DbSet<ValueListCandidate> ValueListCandidates { get; set; }
        public virtual DbSet<Candidate> Candidates { get; set; }
        public virtual DbSet<Parent> Parents { get; set; }
        public virtual DbSet<Taske> Taskes { get; set; }
    }
}