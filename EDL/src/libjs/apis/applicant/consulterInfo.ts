import { pipe } from "fp-ts/lib/function";
import {
  sessions,
  type Session,
  type Announcement,
  announcements,
  isSessionArray,
  isAnnouncementArray,
} from "../../model/Session";
import {
  isClassmentEntryArray,
  type ClassmentEntry,
} from "../../model/ClassmentEntry";
import { taskEither, taskOption } from "fp-ts";
import axios from "axios";
import { axiosConfig, handleAxiosError, serverUrlBase } from "../../core";
import type { Module } from "../../model/Module";

export async function getSessions(
  callBack: (s: Session[]) => void,
  failure: () => void
) {
  return pipe(
    taskEither.tryCatch(
      () => axios.get(`${serverUrlBase}/applicant/session`, axiosConfig),
      (e) =>
        handleAxiosError(e, failure, () =>
          console.error("unknown Error in getVirtualPlatform")
        )
    ),
    taskOption.fromTaskEither,
    taskOption.map((r) => r.data),
    taskOption.match(() => console.error("Bad payload"), callBack)
  )();
}

export async function getModules(
  callBack: (m: Module[]) => void,
  failure: () => void,
  session_id: number
) {
  return pipe(
    taskEither.tryCatch(
      () =>
        axios.get(
          `${serverUrlBase}/applicant/module/session=${session_id}`,
          axiosConfig
        ),
      (e) =>
        handleAxiosError(e, failure, () =>
          console.error("unknown Error in getVirtualPlatform")
        )
    ),
    taskOption.fromTaskEither,
    taskOption.map((r) => r.data),
    taskOption.match(() => console.error("Bad payload"), callBack)
  )();
}

export async function getAnnouncements(
  callBack: (a: Announcement[]) => void,
  failure: () => void,
  session_id: number
) {
  return pipe(
    taskEither.tryCatch(
      () =>
        axios.get(
          `${serverUrlBase}/applicant/announcement/session=${session_id}`,
          axiosConfig
        ),
      (e) =>
        handleAxiosError(e, failure, () =>
          console.error("unknown Error in getVirtualPlatform")
        )
    ),
    taskOption.fromTaskEither,
    taskOption.map((r) => r.data),
    taskOption.filter(isAnnouncementArray),
    taskOption.match(() => console.error("Bad payload"), callBack)
  )();
}

export async function getResults(
  callBack: (c: ClassmentEntry[]) => void,
  failure: () => void,
  session_id: number
) {
  return pipe(
    taskEither.tryCatch(
      () =>
        axios.get(
          `${serverUrlBase}/applicant/classement/session=${session_id}`,
          axiosConfig
        ),
      (e) =>
        handleAxiosError(e, failure, () =>
          console.error("unknown Error in getVirtualPlatform")
        )
    ),
    taskOption.fromTaskEither,
    taskOption.map((r) => r.data),
    taskOption.filter(isClassmentEntryArray),
    taskOption.match(() => console.error("Bad payload"), callBack)
  )();
}
