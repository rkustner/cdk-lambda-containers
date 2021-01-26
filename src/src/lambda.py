import json
import boto3

translate = boto3.client(service_name='translate', region_name='eu-west-1', use_ssl=True)

def handler(event, context):
    input = "Our president is riding on a bicycle"
    if "queryStringParameters" in event:
        if event["queryStringParameters"]:
            if "input" in event["queryStringParameters"]:
                input = event["queryStringParameters"]["input"]
      
    html = '<FORM ACTION="/prod" METHOD="GET"><INPUT TYPE="text" NAME="input" VALUE="%s" SIZE="32" LENGTH="64"><INPUT TYPE="submit" VALUE="submit"></FORM><BR>' % (input)

    result = translate.translate_text(
            Text=input, 
            SourceLanguageCode="en", 
            TargetLanguageCode="it")
    
    translation = result.get('TranslatedText')
    html = "%sTranslated: <b>%s</b>" % (html, translation)

    return {
        "statusCode": 200,
        "headers": { "Content-type": "text/html"} ,
        "body": html
    }