import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateParamsStrService {
  generate(params: Record<string, any>): string {
    // Add the API key to the params
    const updatedParams = { ...params, key: process.env.WEATHER_API_KEY };

    // Create a URLSearchParams instance
    const searchParams = new URLSearchParams();

    // Flatten the object and append each key-value pair to searchParams
    for (const [key, value] of Object.entries(
      this.flattenObject(updatedParams),
    )) {
      searchParams.append(key, value);
    }

    // Return the constructed query string
    return searchParams.toString();
  }

  // Helper method to flatten nested objects
  private flattenObject(
    ob: Record<string, any>,
    prefix = '',
  ): Record<string, any> {
    return Object.keys(ob).reduce((acc, k) => {
      const pre = prefix.length ? `${prefix}[${k}]` : k;
      if (
        typeof ob[k] === 'object' &&
        ob[k] !== null &&
        !Array.isArray(ob[k])
      ) {
        Object.assign(acc, this.flattenObject(ob[k], pre));
      } else {
        acc[pre] = ob[k];
      }
      return acc;
    }, {});
  }
}
