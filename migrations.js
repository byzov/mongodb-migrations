//Settings
var migrationCollection = "migration";
var dbName = "migration_test";

var migrations = [];

//Rev 2
//TODO Place your mirgation code here
migrations[2] = {
  up: function(){
    db.createCollection("foobar");
  },
  down: function(){
    db.foobar.drop();
  }
};

//Rev 1
migrations[1] = {
  up: function(){
    db.createCollection(migrationCollection);
  },
  down: function(){
    db[migrationCollection].drop();
  }
};


//Don`t remove code belove

//Switch to valid db
db = db.getSiblingDB(dbName)

//Get current revision number
var currMigration = db[migrationCollection].findOne();
currMigration = currMigration != null ? currMigration : { revision: 0, create_date: new Date()};
print ( 'current rev ' + currMigration.revision );

for( var rev = currMigration.revision + 1; rev < migrations.length; rev++ )
{
  print ('up to rev ' + rev);
  migrations[rev].up();
}

//Save current rev number
currMigration.revision = migrations.length - 1;
db[migrationCollection].save(currMigration);

