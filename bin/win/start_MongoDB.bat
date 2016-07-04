set CURWORKINGDIR=%CD%
set DBDIR=%CURWORKINGDIR%\..\..\.db
mkdir %DBDIR%
mongod --dbpath %DBDIR%