export namespace API{
  // export function Method(w: string): string
  export interface endpoint {
    //方法: user.account.login
    method?: string
  }

  export type params = {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  }
  ////Request 客户端请求数据结构 Data会被解码传到后端真正的服务逻辑
  // type Request struct {
  // 	Method    string `json:"method" binding:"required"`
  // 	Data      string `json:"data" binding:"required"`
  // 	Timestamp int64  `json:"timestamp" binding:"required"`
  // 	Version   string `json:"version" binding:"required"`
  // 	Sign      string `json:"sign" binding:"required"`
  // 	SignType  string `json:"sign_type" choices:"md5" binding:"required"`
  // }
  export interface request {
    method: string
    data: string
    timestamp: number
    version: string
    sign: string
    sign_type: string
  }
  //
  // export class request implements API.request{
  //   data: string | undefined;
  //   method: string | undefined;
  //   sign: string | undefined;
  //   sign_type: string | undefined;
  //   timestamp: number | undefined;
  //   version: string | undefined;
  //
  //   Build(): string {
  //     return "";
  //   }
  //
  //   Sign(): string {
  //     return "";
  //   }
  // }

  //  分页信息
  //	Page       int `json:"page" name:"页码索引（从1开始）"`
  // 	Size       int `json:"size" name:"分页大小"`
  // 	Total      int `json:"total" name:"总条数"`
  // 	TotalPages int `json:"totalPages" name:"总页数"`
  export interface pagination{
    page: number
    size: number
    total: number
    total_pages: number
  }

  // Response 给客户端的返回数据结构
  // type Response struct {
  // 	Code       int         `json:"code" xml:"code"`
  // 	Message    string      `json:"message" xml:"message"`
  // 	Content    interface{} `json:"content" xml:"content"`
  // 	Pagination interface{} `json:"pagination" xml:"pagination"`
  // 	TraceID    string      `json:"trace_id" xml:"trace_id"`
  // 	Timestamp  int64       `json:"timestamp" xml:"timestamp"`
  // 	Sign       string      `json:"sign" xml:"sign"`
  // }
  export interface response<T> {
    code: number
    message: string
    content: T
    pagination?: pagination
    trace_id: string
    timestamp: string
    sign: string
  }

}
