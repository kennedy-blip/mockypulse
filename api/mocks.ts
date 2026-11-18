import type {VercelRequest,VercelResponse} from "@vercel/node";
import {getRoutes,setRoutes,json,readBody,validRoute} from "./_store";
import type {MockRoute} from "./_store";
export default function handler(req:VercelRequest,res:VercelResponse){
 if(req.method==="GET")return json(res,200,{routes:getRoutes()});
 if(req.method==="POST"){const v=readBody(req);if(!validRoute(v))return json(res,400,{error:"Invalid route payload"});if(getRoutes().some(r=>r.path===v.path&&r.method===v.method))return json(res,409,{error:"Route already exists"});setRoutes([v,...getRoutes()]);return json(res,201,{route:v});}
 if(req.method==="PUT"){const v=readBody(req);if(!v||!Array.isArray(v.routes)||v.routes.length>250||!v.routes.every(validRoute))return json(res,400,{error:"Invalid routes collection"});if(new Set(v.routes.map((r:MockRoute)=>r.method+":"+r.path)).size!==v.routes.length)return json(res,400,{error:"Duplicate routes"});setRoutes(v.routes);return json(res,200,{routes:getRoutes()});}
 if(req.method==="DELETE"){const id=typeof req.query.id==="string"?req.query.id:"";const next=id?getRoutes().filter(r=>r.id!==id):[];setRoutes(next);return json(res,200,{routes:next});}
 res.setHeader("Allow","GET, POST, PUT, DELETE");return json(res,405,{error:"Method not allowed"});
}