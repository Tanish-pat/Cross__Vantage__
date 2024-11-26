from flask import Flask, request, jsonify
import boto3
import os

app = Flask(__name__)


bedrock_client = boto3.client(
    service_name='bedrock-agent-runtime',
    region_name='us-east-1',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
)

def retrieve_and_generate(input_text):
    response = bedrock_client.retrieve_and_generate(
        input={'text': input_text},
        retrieveAndGenerateConfiguration={
            'type': 'KNOWLEDGE_BASE',
            'knowledgeBaseConfiguration': {
                'knowledgeBaseId': os.getenv('KNOWLEDGE_BASE_ID'),
                'modelArn': os.getenv('MODEL_ARN')
            }
        }
    )
    return response['output']['text']

@app.route('/generate', methods=['POST'])
def generate_response():
    data = request.json
    input_text = data.get('text')
    if not input_text:
        return jsonify({'error': 'Text is required'}), 400
    
    try:
        output = retrieve_and_generate(input_text)
        print(output)
        return jsonify({'response': output})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
