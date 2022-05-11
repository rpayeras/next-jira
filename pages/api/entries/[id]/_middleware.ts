import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  // if (req.page.name.includes("entries")) {
  //   return NextResponse.next();
  // }
  const { id }: any = req.page.params;

  const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

  if (!checkMongoIDRegExp.test(id)) {
    //return res.status(400).json({ message: "Id not valid" });
    return new Response(JSON.stringify({ message: "Id is not valid" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return NextResponse.next();
}
