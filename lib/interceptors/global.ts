import {
  CallHandler,
  ExecutionContext,
  Inject,
  NestInterceptor,
} from "@nestjs/common";
import { map } from "rxjs/operators";
import fastjsonschema from "fast-json-stringify";
import { JSON_SCHEMA_RESPONSE_MAP, REFLECTOR } from "../constants";

export class SerializerGlobalInterceptor implements NestInterceptor {
  constructor(@Inject(REFLECTOR) protected readonly reflector: any) {}

  public async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const schema = this.retrieveSchemaMetadata(context);

    if (!schema) {
      return next.handle();
    }

    return next
      .handle()
      .pipe(
        map((payload: Record<string, unknown>) =>
          this.serialize(payload, schema)
        )
      );
  }

  public serialize(
    payload: Record<string, unknown>,
    schema: fastjsonschema.AnySchema
  ): string {
    const serializer = fastjsonschema(schema);
    return serializer(payload);
  }

  public retrieveSchemaMetadata(
    context: ExecutionContext
  ): fastjsonschema.AnySchema {
    return (
      this.reflector.get(JSON_SCHEMA_RESPONSE_MAP, context.getHandler()) ??
      this.reflector(JSON_SCHEMA_RESPONSE_MAP, context.getClass())
    );
  }
}
