import asyncio
from infinity_emb import AsyncEngineArray, EngineArgs, AsyncEmbeddingEngine

sentences = ["Embed this is sentence via Infinity.", "Paris is in France."]
array = AsyncEngineArray.from_args([
  EngineArgs(model_name_or_path = "BAAI/bge-small-en-v1.5", engine="torch", embedding_dtype="float32", dtype="auto")
])

async def embed_text(engine: AsyncEmbeddingEngine): 
    async with engine: 
        embeddings, usage = await engine.embed(sentences=sentences)
    # or handle the async start / stop yourself.
    await engine.astart()
    embeddings, usage = await engine.embed(sentences=sentences)
    await engine.astop()
asyncio.run(embed_text(array[0]))