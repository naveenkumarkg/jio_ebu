export enum EmailOtpActionTypes {
    SET_OTP = '[OTP - Email] save otp to state',
    SET_OTP_SUCCESS = '[OTP - Email] save otp to state success',
    SET_OTP_ERROR = '[OTP - Email] save otp to state error',
    SEND_OTP_SUCCESS = '[OTP - Email] send otp successful',
    SEND_OTP_ERROR = '[OTP - Email] error sending otp',
    SET_OTP_DESTINATION = '',
    RESEND_OTP_SUCCESS = '[OTP - Email] resend otp successful',
    RESEND_OTP_ERROR = '[OTP - Email] error resending otp',
    VALIDATE_OTP_SUCCESS = '[OTP - Email] validate otp successful',
    VALIDATE_OTP_ERROR = '[OTP - Email] error validating otp',
}
