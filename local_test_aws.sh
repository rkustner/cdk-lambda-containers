DOCKER_IMAGE="875114cb4f9b"

aws sts get-session-token > /tmp/sts-token.json
AWS_ACCESS_KEY_ID=`cat /tmp/sts-token.json | jq '.Credentials.AccessKeyId' -r`
AWS_SECRET_ACCESS_KEY=`cat /tmp/sts-token.json | jq '.Credentials.SecretAccessKey' -r`
AWS_SESSION_TOKEN=`cat /tmp/sts-token.json | jq '.Credentials.SessionToken' -r`
rm -f /tmp/sts-token.json

docker run -d -p 9000:8080 --env AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID}" --env AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY}" --env AWS_SESSION_TOKEN="${AWS_SESSION_TOKEN}" ${DOCKER_IMAGE}

echo "Test Lambda with:"
echo "curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" \
-d '{\"queryStringParameters\": {\"input\": \"blah\"} }'"

