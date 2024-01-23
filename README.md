# autonomizeAssessment


1. Search Route
Endpoint:GET /search


Description:
Sorts data based on the specified criteria.

2. Get User by Username Route
Endpoint:GET /:username


Description:
Fetches user data by the given username. If the user is not found in the database, it fetches the data from the GitHub API and stores it in the database.

3. Search by Username and Location Route
Endpoint:GET /

Description:
Searches for users in the database based on username and location.

4. Soft Delete Route
Endpoint:DELETE /:username


Description:
Soft deletes a user by setting the isDeleted flag to true.

5. Update Data Route
Endpoint:PATCH /:username

Description:
Updates user data by the given username. If the user is marked as deleted, it returns an appropriate message.


