import { pipe } from "fp-ts/lib/function";
import {
  isUserArray,
  type ApplicantAffectation,
  type User,
} from "../../model/User";
import { taskEither, taskOption } from "fp-ts";
import axios from "axios";
import { axiosConfig, handleAxiosError, serverUrlBase } from "../../core";

export function get_possible_applicants(
  callback: (a: User[]) => void,
  failure: () => void
) {
  pipe(
    taskEither.tryCatch(
      () => axios.get(`${serverUrlBase}/vice-doyen/applicant`, axiosConfig),
      (e) =>
        handleAxiosError(e, failure, () =>
          console.error("Unknown error get_session")
        )
    ),
    taskOption.fromTaskEither,
    taskOption.map((r) => r.data),
    taskOption.match(() => console.error("bad payload"), callback)
  )();
}

export async function get_affected_applicants(
  callback: (a: User[]) => void,
  failure: () => void,
  session_id: number
) {
  return pipe(
    taskEither.tryCatch(
      () =>
        axios.get(
          `${serverUrlBase}/vice-doyen/applicant/session=${session_id}`,
          axiosConfig
        ),
      (e) =>
        handleAxiosError(e, failure, () =>
          console.error("Unknown error get_session")
        )
    ),
    taskOption.fromTaskEither,
    taskOption.map((r) => r.data),
    taskOption.match(() => console.error("bad payload"), callback)
  )();
}

export async function get_applicant_affectations(
  callback: (a: ApplicantAffectation[]) => void,
  failure: () => void,
  session_id: number
) {
  return pipe(
    taskEither.tryCatch(
      () =>
        axios.get(
          `${serverUrlBase}/vice-doyen/applicantaffected/${session_id}`,
          axiosConfig
        ),
      (e) =>
        handleAxiosError(e, failure, () =>
          console.error("Unknown error get_session")
        )
    ),
    taskOption.fromTaskEither,
    taskOption.map((r) => r.data),
    taskOption.match(() => console.error("bad payload"), callback)
  )();
}
export function affect_applicant(
  callback: () => void,
  failure: () => void,
  af: ApplicantAffectation
) {
  pipe(
    taskEither.tryCatch(
      () =>
        axios.post(`${serverUrlBase}/vice-doyen/applicant`, af, axiosConfig),
      (e) =>
        handleAxiosError(e, failure, () =>
          console.error("Unknown error get_session")
        )
    ),
    taskEither.match(console.error, (r) => {
      console.error(r);
      callback();
    })
  )();
}
export function encode_applicant(
  callback: () => void,
  failure: () => void,
  af: ApplicantAffectation
) {
  pipe(
    taskEither.tryCatch(
      () =>
        axios.put(
          `${serverUrlBase}/vice-doyen/applicant/encode`,
          af,
          axiosConfig
        ),
      (e) =>
        handleAxiosError(e, failure, () =>
          console.error("Unknown error get_session")
        )
    ),
    taskEither.match(console.error, (r) => {
      callback();
    })
  )();
}
export function delete_affectation(
  callback: () => void,
  failure: () => void,
  af: ApplicantAffectation
) {
  pipe(
    taskEither.tryCatch(
      () =>
        axios.delete(`${serverUrlBase}/vice-doyen/applicant`, {
          ...axiosConfig,
          data: af,
        }),
      (e) =>
        handleAxiosError(e, failure, () =>
          console.error("Unknown error get_session")
        )
    ),
    taskEither.match(console.error, (r) => {
      callback();
    })
  )();
}
