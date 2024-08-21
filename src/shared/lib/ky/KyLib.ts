export class KyLib {
  static mockResolvedKyResponse<D>(data: D): Promise<Response> {
    const response = new Response(JSON.stringify(data), {
      status: 200,
      statusText: "OK",
      headers: { "Content-Type": "application/json" },
    });

    return Promise.resolve(response);
  }
}
