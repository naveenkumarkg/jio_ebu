export enum AccountNumberOtpActionTypes {
    SET_OTP = '[OTP - AccountNumber] save otp to state',
    SET_OTP_SUCCESS = '[OTP - AccountNumber] save otp to state success',
    SET_OTP_ERROR = '[OTP - AccountNumber] save otp to state error',
    SEND_OTP_SUCCESS = '[OTP - AccountNumber] send otp successful',
    SEND_OTP_ERROR = '[OTP - AccountNumber] error sending otp',
    SET_OTP_DESTINATION = '',
    RESEND_OTP_SUCCESS = '[OTP - AccountNumber] resend otp successful',
    RESEND_OTP_ERROR = '[OTP - AccountNumber] error resending otp',
    VALIDATE_OTP_SUCCESS = '[OTP - AccountNumber] validate otp successful',
    VALIDATE_OTP_ERROR = '[OTP - AccountNumber] error validating otp',
}
