import { SetMetadata } from "@nestjs/common";
import fastjsonstringfy from "fast-json-stringify";
import { JSON_SCHEMA_RESPONSE_MAP } from "../constants";

export const Serializer = (schema: fastjsonstringfy.AnySchema) =>
  SetMetadata(JSON_SCHEMA_RESPONSE_MAP, schema);
