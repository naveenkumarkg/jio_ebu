export enum SmSOtpActionTypes {
    SET_OTP = '[OTP - SMS] save otp to state',
    SET_OTP_SUCCESS = '[OTP - SMS] save otp to state success',
    SET_OTP_ERROR = '[OTP - SMS] save otp to state error',
    SEND_OTP_SUCCESS = '[OTP - SMS] send otp successful',
    SEND_OTP_ERROR = '[OTP - SMS] error sending otp',
    SET_OTP_DESTINATION = '',
    RESEND_OTP_SUCCESS = '[OTP - SMS] resend otp successful',
    RESEND_OTP_ERROR = '[OTP - SMS] error resending otp',
    VALIDATE_OTP_SUCCESS = '[OTP - SMS] validate otp successful',
    VALIDATE_OTP_ERROR = '[OTP - SMS] error validating otp',
}
