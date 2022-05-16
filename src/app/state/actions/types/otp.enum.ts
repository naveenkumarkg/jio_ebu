export enum OtpActionTypes {
    SET_OTP = '[OTP] Save OTP in state',
    // Send OTP
    SEND_OTP = '[OTP] send otp',
    SEND_OTP_SUCCESS = '[OTP] send otp successful',
    SEND_OTP_ERROR = '[OTP] error sending otp',
    SET_OTP_DESTINATION = '[OTP] Set OTP destination',

    // Resend OTP
    RESEND_OTP_SUCCESS = '[OTP] resend otp successful',
    RESEND_OTP_ERROR = '[OTP] error resending otp',

    // Validate OTP
    VALIDATE_OTP_SUCCESS = '[OTP] valide otp successful',
    VALIDATE_OTP_ERROR = '[OTP] error validating otp',
    VALIDATE_OTP = '[OTP - Validate] send OTP for validation',

    // OTPKey
    SET_OTP_KEY = '[OTP] set OTP Key',

    RE_SEND_OTP = '[OTP] resend OTP',
}
