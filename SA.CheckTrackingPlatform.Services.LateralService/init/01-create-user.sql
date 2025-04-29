
/* Des erreurs car compilateur connait que T-sql et non pas sql */
/* ne génere pas de problème dans l'éxecution */

WHENEVER SQLERROR EXIT SQL.SQLCODE

ALTER SESSION SET CONTAINER = xepdb1;

CREATE USER SouhailIsmailOuldelhkim  IDENTIFIED BY "b252947d"
  DEFAULT TABLESPACE users
  TEMPORARY TABLESPACE temp
  QUOTA UNLIMITED ON users;

GRANT CONNECT, RESOURCE TO myapp;
exit 
