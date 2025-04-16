// package com.example.server.config;

// import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.HttpStatusCode;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.RestControllerAdvice;
// import org.springframework.web.context.request.ServletWebRequest;
// import org.springframework.web.context.request.WebRequest;
// import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
// import org.springframework.web.bind.MethodArgumentNotValidException;

// import java.time.LocalDateTime;
// import java.util.List;
// import java.util.stream.Collectors;

// @RestControllerAdvice
// public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
//     @Override
//     protected ResponseEntity<Object> handleMethodArgumentNotValid(
//             MethodArgumentNotValidException ex,
//             HttpHeaders headers,
//             HttpStatusCode status,
//             WebRequest request) {

//         List<ApiSubError> subErrors = ex.getBindingResult().getFieldErrors().stream()
//             .map(err -> new ApiSubError(
//                 err.getField(),
//                 err.getRejectedValue(),
//                 err.getDefaultMessage()
//             ))
//             .collect(Collectors.toList());

//         String path = ((ServletWebRequest) request).getRequest().getRequestURI();
//         ApiError apiError = new ApiError(
//             status.value(),
//             HttpStatus.valueOf(status.value()).getReasonPhrase(),
//             "Validation failed for one or more fields", 
//             path,
//             subErrors
//         );

//         return new ResponseEntity<>(apiError, headers, status);
//     }

//     // Nested class for individual field errors
//     public static class ApiSubError {
//         public String field;
//         public Object rejectedValue;
//         public String message;

//         public ApiSubError(String field, Object rejectedValue, String message) {
//             this.field = field;
//             this.rejectedValue = rejectedValue;
//             this.message = message;
//         }
//     }

//     // Main error response structure
//     public static class ApiError {
//         public int status;
//         public String error;
//         public String message;
//         public String path;
//         public LocalDateTime timestamp;
//         public List<ApiSubError> errors;

//         public ApiError(int status, String error, String message, String path, List<ApiSubError> errors) {
//             this.status = status;
//             this.error = error;
//             this.message = message;
//             this.path = path;
//             this.timestamp = LocalDateTime.now();
//             this.errors = errors;
//         }
//     }
// }
