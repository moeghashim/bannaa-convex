/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as admin from "../admin.js";
import type * as applications from "../applications.js";
import type * as curriculum from "../curriculum.js";
import type * as curriculumAdmin from "../curriculumAdmin.js";
import type * as leads from "../leads.js";
import type * as siteCourses from "../siteCourses.js";
import type * as siteCoursesAdmin from "../siteCoursesAdmin.js";
import type * as siteCoursesAdminCms from "../siteCoursesAdminCms.js";
import type * as userPlan from "../userPlan.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  admin: typeof admin;
  applications: typeof applications;
  curriculum: typeof curriculum;
  curriculumAdmin: typeof curriculumAdmin;
  leads: typeof leads;
  siteCourses: typeof siteCourses;
  siteCoursesAdmin: typeof siteCoursesAdmin;
  siteCoursesAdminCms: typeof siteCoursesAdminCms;
  userPlan: typeof userPlan;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
