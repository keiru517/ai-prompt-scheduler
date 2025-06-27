"use server";

import { cookies } from "next/headers";

import {
  ILogIn,
  ActionResult,
  ILogInRes,
  IRegist,
  IRegistRes,
  IVerifySMS,
} from "@/lib/definition";
import { appConfig } from "./config";
const fetchBE = appConfig.apiBaseUrl;

export async function logIn(params: ILogIn): Promise<ActionResult<ILogInRes>> {
  try {
    const headers = { "Content-Type": "application/json" };

    const response = await fetch(`${fetchBE}/v1/auth/login`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        phone_number: params.phone_number,
      }),
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        error: {
          code: `API_ERROR_${response.status}`,
          message: responseData.detail || `API error: ${response.status}`,
        },
      };
    }

    return {
      success: true,
      data: responseData,
    };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred";
    return {
      success: false,
      error: {
        code: "UNKNOWN_ERROR",
        message: errorMessage || "An unexpected error occurred",
      },
    };
  }
}

export async function regist(
  params: IRegist
): Promise<ActionResult<IRegistRes>> {
  try {
    const headers = { "Content-Type": "application/json" };

    const response = await fetch(`${fetchBE}/v1/auth/regist`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        phone_number: params.phone_number,
        first_name: params.first_name,
        last_name: params.last_name,
      }),
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        error: {
          code: `API_ERROR_${response.status}`,
          message: responseData.detail || `API error: ${response.status}`,
        },
      };
    }

    return {
      success: true,
      data: responseData,
    };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred";
    return {
      success: false,
      error: {
        code: "UNKNOWN_ERROR",
        message: errorMessage || "An unexpected error occurred",
      },
    };
  }
}

export async function verifySMS(
  params: IVerifySMS
): Promise<ActionResult<ILogInRes>> {
  try {
    const headers = { "Content-Type": "application/json" };

    const response = await fetch(`${fetchBE}/v1/auth/verify-sms`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        phone_number: params.phone_number,
        otp_code: params.otp_code,
      }),
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        error: {
          code: `API_ERROR_${response.status}`,
          message: responseData.detail || `API error: ${response.status}`,
        },
      };
    }

    const cookieStore = await cookies();
    const tokenValue = responseData.access_token;
    // 仮で3時間
    const expiresValue = new Date(Date.now() + 3 * 60 * 60 * 1000);

    cookieStore.set({
      name: "token",
      value: tokenValue || "",
      sameSite: "strict",
      secure: true,
      httpOnly: true,
      expires: expiresValue,
    });

    return {
      success: true,
      data: responseData,
    };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred";
    return {
      success: false,
      error: {
        code: "UNKNOWN_ERROR",
        message: errorMessage || "An unexpected error occurred",
      },
    };
  }
}

export async function userLogout() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const response = await fetch(`${fetchBE}/v1/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        error: {
          code: `API_ERROR_${response.status}`,
          message: responseData.detail || `API error: ${response.status}`,
        },
      };
    }

    cookieStore.delete("token");

    return {
      success: true,
      data: responseData,
    };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred";
    return {
      success: false,
      error: {
        code: "UNKNOWN_ERROR",
        message: errorMessage || "An unexpected error occurred",
      },
    };
  }
}
