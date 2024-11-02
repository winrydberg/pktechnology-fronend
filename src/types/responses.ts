export interface Responses {
    code: string;
    message: string;
    errors: any
}

export interface AccountResponse extends Responses {
    data: T;
}

interface ClientCall {
    id: string,
    name:null,
    description: string,
    status: string,
    startTime: Date,
    completionTime: Time
}

interface Binding {
    id:string,
    name:string,
    description:string,
    status:string,
    startTime: string,
    completionTime:string
}


interface OutdoorInstallation {
    id:string,
    name:string,
    description:string,
    status:string,
    startTime: string,
    completionTime:string
}

interface IndoorInstallation {
    id:string,
    name:string,
    description:string,
    status:string,
    startTime: string,
    completionTime:string
}


interface Testing {
    id:string,
    name:string,
    description:string,
    status:string,
    startTime: string,
    completionTime:string
}


export interface WorkOrder {
    msisdn: string,
    customerName: string,
    customerAddress: string,
    customerPhoneNumbers:Array,
    location: string,
    salesAgent: string,
    salesAgentPhoneNumber: string,
    coOrdinates: string,
    vendor: string,
    date: Date,
    category: string,
    engineerCode: string,
    clientCall: ClientCall | null,
    binding: Binding | null,
    outdoorInstallation: OutdoorInstallation | null,
    indoorInstallation: IndoorInstallation | null,
    testing: Testing | null,
}

export interface WorkOrderResponse extends Responses {
    data: {
        results: WorkOrder[];
    }
}