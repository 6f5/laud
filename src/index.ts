
export default class Laud implements LaudError {
  static debugger: Function = console.info
  static logger: Function = console.log
  status: number
  code: string
  message: string
  solution?: string | undefined
  troubleshoot?: string | undefined
  details?: LaudErrorDetail[] | undefined
  timems: number

  constructor({ status, code, message, solution, troubleshoot, details }: LaudError) {
    this.status = status;
    this.code = code;
    this.message = message;
    this.solution = solution;
    this.troubleshoot = troubleshoot;
    this.details = details;
    this.timems = Date.now() // milliseconds
  }

  /**
   * Calls the specified debugger, console.info is the default
   */
  debug() {
    if (Laud.debugger == null) {
      throw new Error("Debugger is not set. SOLUTION: Laud.debugger = someDebugger")
    }
    Laud.debugger(this.toOBJ());
  }

  /**
   * Calls the specified logger, console.log is the default
   */
  log() {
    if (Laud.logger == null) {
      throw new Error("Logger is not set. SOLUTION: Laud.logger = someDebugger")
    }
    Laud.logger(this.toOBJ())
  }

  /**
   * Convert the Laud error into an object
   * @returns Error object
   */
  toOBJ(): LaudError & { timems: number } {
    return {
      status: this.status,
      code: this.code,
      message: this.message,
      solution: this.solution,
      troubleshoot: this.troubleshoot,
      details: this.details,
      timems: this.timems
    }
  }

  /**
   * Convert the error to JSON format
   * @param filter A function to filter the fields, return true to keep a field
   * @returns JSON representation of the error
   */
  toJSON(filter?: (key: keyof LaudError) => boolean) {
    const obj = this.toOBJ();

    if (filter) {
      (Object.keys(obj) as [keyof LaudError]).filter((key) => {
        if (!filter(key)) {
          delete obj[key]
        }
      })
    }

    return JSON.stringify(obj)
  }

}



export interface LaudError {
  status: number,
  code: string,
  message: string,
  solution?: string,
  troubleshoot?: string,
  details?: LaudErrorDetail[],
}

export interface LaudErrorDetail {
  field?: string,
  message: string,
  code?: string,
  sub_code?: string,
  ref?: string,
  solution?: string,
  troubleshoot?: string
}
