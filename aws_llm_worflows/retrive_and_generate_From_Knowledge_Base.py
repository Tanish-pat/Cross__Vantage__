import boto3
import os

bedrock_client = boto3.client(
    service_name='bedrock-agent-runtime',
    region_name='us-east-1',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
)


def retrieveAndGenerate(input_text):
    return bedrock_client.retrieve_and_generate(
        input={'text': input_text},
        retrieveAndGenerateConfiguration={
            'type': 'KNOWLEDGE_BASE',
            'knowledgeBaseConfiguration': {
            'knowledgeBaseId': 'TKWLHI8NJK',
                'modelArn': 'arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-text-premier-v1:0'
            }
        }
    )
        

prompt = 'Give me an overview of Compliances, Incentives and risk analysis pertaining to export of textiles from India to US  with examples'
print(retrieveAndGenerate(prompt)['output']['text'])