using System;
using System.Collections.Generic;
using System.Text;
using DataAccess.Infrastructure.Interfaces;

namespace DataAccess
{
    public abstract class BaseRepository
    {
        protected string ConnectionString { get; }
        protected IDbContextFactory ContextFactory { get; }

        protected BaseRepository(string connectionString, IDbContextFactory contextFactory)
        {
            ConnectionString = connectionString;
            ContextFactory = contextFactory;
        }
    }
}
