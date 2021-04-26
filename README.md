1. To run this app install all dependencies using `npm install` in functions directory
2. Copy env.json file to the src/config directory
3. Use `npm run serve` to run emulators
4. Use

# http://localhost:5001/dominik-test-task1/us-central1/createUserAndLogin

to create user, this request return Token

5. Use token in authorization for requests

# http://localhost:5001/dominik-test-task1/us-central1/getFileForEnvelope

and

# http://localhost:5001/dominik-test-task1/us-central1/getMyOpenEnvelops
