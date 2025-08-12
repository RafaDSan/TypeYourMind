import { protos, SpeechClient } from "@google-cloud/speech";
import { Duplex } from "stream";

// Define the configuration for the streaming recognition request
const recognitionConfig: protos.google.cloud.speech.v2.IRecognitionConfig = {
  explicitDecodingConfig: {
    audioChannelCount: 1,
    encoding: "LINEAR16",
    sampleRateHertz: 16000,
  },
  languageCodes: ["pt-BR"],
  model: "latest_long",
};

const streamingConfig: protos.google.cloud.speech.v2.IStreamingRecognitionConfig =
  {
    config: recognitionConfig,
    streamingFeatures: {
      interimResults: true,
    },
  };

const streamingRecognizeRequest: protos.google.cloud.speech.v2.IStreamingRecognizeRequest =
  {
    recognizer: `projects${process.env.GOOGLE_PROJECT_ID}/locations/global/recognizers/_`,
    streamingConfig: streamingConfig,
  };

export class RecognitionHandler {
  private googleSttClient: SpeechClient;
  private googleSttStream: Duplex;

  constructor() {
    // Instantiate the Google STT client. This client can be reused across multiple streams.
    this.googleSttClient = new SpeechClient();

    // Create the streaming recognition stream
    this.googleSttStream = this.googleSttClient.streamingRecognize();

    this.googleSttStream.write(streamingRecognizeRequest);

    this.googleSttStream.on("data", (data) => {
      // Handle incoming transcritptions
    });

    this.googleSttStream.on("error", (error) => {
      // Handle errors
    });

    this.googleSttStream.on("end", () => {
      // Handle stream end
    });
  }
}
