import { IsString, IsNotEmpty } from 'class-validator';

export class LoginWithEmployeeIdDto {
  @IsString()
  @IsNotEmpty()
  employee_id: string;
}
