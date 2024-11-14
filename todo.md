# LLM part

Training a small LLM based on the data that is relevant to our use case outperforms Large LLMs 

So Converting all the Raw data scraped off internet ----> preprocess pipeline ----> Train LLM


There needs to sentences like := " This is the novel part about solution .... ;
Has never been tried before ... we have succesfully created this never been done ... "

There are Only 2 Databases
- Vector Databases ( Store Embedding from  )
- MongoDB


Code needs to *LOOK* working


What 





1. Demo should be ONLY 30 seconds and needs to in the README.md of the repo too
2. Have a screenshot of Cloud Functions getting triggered
3. Chats with the bot
**Gallery_Section_of_Proposal_Document_and_README**
4. Screenshot of LLMs accepting request from the user ; Chat UI ( 200 OK in Terminal )
5. Screenshots of Fine Tuning ( code / Postman ) ; How much time it took kk
(Scalability)
8. keep track how many changes are made in the endpoints --> if N > 5 => run 5 instances of Cloud function to scale as the data changes increase 


Future Plans :-
- Complete the website and Deploy
- Make the LLMs have memory ( ability to save contexts )
- Make the LLMs mention SOURCES from where it got that information
- MLOps ( Make the crawler -> extractor -> create_embedding -> re-train LLM this workflow automatic via DevOps tools )

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


Data Lake ---- many crawlers script ---> Preprocessing Pipeline { parsing PDFs, extracting information in useful text form ; parsing HTMLs ; parsing Images  }
----> Feeding into LLMs

規模　気にょ


http://localhost:11434/  <--- Ollama runs here

```sh
$ ollama serve  # server running at port 
$ ollama list
$ ollama pull tinyllama
$ ollama run tinyllama
```


# Things to do
Visual Paradigm + Chat GPT ( hwo to do this porject ) + Mermaid 


How to make our proposal *ATTRACTIVE*
=> Answer `HOW` we did the hints stuff
=> Video of MVP and demonstration 
=> Flowchart diagram of working

    Aggregate information from various government and third-party sources to provide
    a comprehensive overview of compliance requirements for exporting to the US and Europe

    Identify relevant incentives and grants available for exporters in the US and Europe

prepare extensive documentation for cross-border trade
carefully navigate uncertainties and risks associated with international expansion.

Incentives :-
On Export Profuct => there are REMISSIONS from Indian Govt


