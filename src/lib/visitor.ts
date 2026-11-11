'use client';

const VISITOR_KEY = 'ktrs_visitor_id';

/** 브라우저에 저장되는 익명 방문자 ID (개인정보 없음). 저장소를 쓸 수 없으면 undefined */
export function getVisitorId(): string | undefined {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `v-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return undefined;
  }
}
