export const generateEmbeddings = async (texts: string[]) =>{
  const project = process.env.GOOGLE_CLOUD_PROJECT;
  const apiEndpoint = process.env.GOOGLE_CLOUD_LOCATION + "-aiplatform.googleapis.com";
  const task = "SEMANTIC_SIMILARITY";
  const model = "text-embedding-004";
  const dimensionality = '0';

  const aiplatform = require("@google-cloud/aiplatform");
  const { PredictionServiceClient } = aiplatform.v1;
  const { helpers } = aiplatform; 
  const clientOptions = { apiEndpoint: apiEndpoint };
  const location = process.env.GOOGLE_CLOUD_LOCATION;
  const endpoint = `projects/${project}/locations/${location}/publishers/google/models/${model}`;

  const callPredict = async  ()=> {
    const instances = texts
      .map((e) => helpers.toValue({ content: e, task_type: task }));
    const parameters = helpers.toValue(
      parseInt(dimensionality) > 0
        ? { outputDimensionality: parseInt(dimensionality) }
        : {}
    );
    const request = { endpoint, instances, parameters };
    const client = new PredictionServiceClient(clientOptions);
    const [response] = await client.predict(request);
    const predictions = response.predictions;
    const embeddings = predictions.map((p:any) => {
      const embeddingsProto = p.structValue.fields.embeddings;
      const valuesProto = embeddingsProto.structValue.fields.values;
      return valuesProto.listValue.values.map((v:any) => v.numberValue);
    });

    return embeddings;
  }

  return await callPredict();
}
