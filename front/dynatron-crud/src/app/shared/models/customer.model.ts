import { AuditedBaseModel } from "./audited-base.model";

export class CustomerModel extends AuditedBaseModel {
    firstName: string = '';
    lastName: string = '';
    email: string = '';
}
