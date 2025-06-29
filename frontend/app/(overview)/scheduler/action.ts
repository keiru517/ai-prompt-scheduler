"use server";

import { cookies } from "next/headers";

import {
  ActionResult,
  ICreatePromptReq,
  ISchedulerList,
  IUpdatePromptSchedule,
  IUpdatePromptStatus,
  IUserList,
} from "@/lib/definition";
import { appConfig } from "@/app/config";

const fetchBE = appConfig.apiBaseUrl;

export async function getSchedulerList(): Promise<
  ActionResult<ISchedulerList>
> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const response = await fetch(`${fetchBE}/v1/prompt/scheduler-list`, {
      method: "get",
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

export async function getUserList(): Promise<ActionResult<IUserList>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const response = await fetch(`${fetchBE}/v1/prompt/user-list`, {
      method: "get",
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

export async function createPrompt(params: ICreatePromptReq) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${fetchBE}/v1/prompt/create`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        phone_number: params.phone_number,
        title: params.title,
        prompt: params.prompt,
        schedule_frequency: params.schedule_frequency,
        schedule_time: params.schedule_time,
        schedule_repeat_peripd: params.schedule_repeat_period,
        schedule_week_day: params.schedule_week_day,
        is_active: params.is_active,
        recipients: params.recipients,
      }),
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

export async function updatePromptStatus(params: IUpdatePromptStatus) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${fetchBE}/v1/prompt/status-update`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify({
        id: params.id,
      }),
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

export async function updatePromptSchedule(params: IUpdatePromptSchedule) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${fetchBE}/v1/prompt/schedule-update`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify({
        id: params.id,
        schedule_frequency: params.schedule_frequency,
        schedule_repeat_period: params.schedule_repeat_period,
        schedule_time: params.schedule_time,
        schedule_week_day: params.schedule_week_day,
      }),
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

export async function deletePrompt(id: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${fetchBE}/v1/prompt/delete`, {
      method: "DELETE",
      headers: headers,
      body: JSON.stringify({
        id: id,
      }),
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
