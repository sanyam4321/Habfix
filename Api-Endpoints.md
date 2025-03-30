# Signup routes return User information
/api/signup/student POST ok
/api/signup/technician POST ok
/api/signup/admin/hostel POST ok
/api/signup/admin/college POST

# Login routes return JWT as cookie and User information
/api/login/student POST ok
/api/login/student/v1/google POST ok
/api/login/technician POST ok
/api/login/admin/hostel POST ok
/api/login/admin/college POST

# Student functionality
/api/issue/create POST ok
/api/issue/studentIssues GET ok

# Technician functionality
/api/issue/technicianIssues GET ok 
/api/issue/resolve/:issue_id PUT ok

# Hostel Admin functionality
/api/issue/hostel/assign PUT ok
/api/issue/hostel/review DELETE ok
/api/issue/hostel/checkIssues GET ok

# College Admin functionality
/api/issue/college/assign PUT
/api/issue/college/review DELETE
/api/issue/college/checkIssues GET

# College Admin or Hostel Admin functionality
/api/issue/listTechnicians GET ok