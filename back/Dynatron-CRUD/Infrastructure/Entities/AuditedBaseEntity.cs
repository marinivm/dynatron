﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Entities
{
    public class AuditedBaseEntity
    {
        public int Id { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime LastUpdate { get; set; }
    }
}
