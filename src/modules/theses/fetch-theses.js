// ====== FETCH ======

export async function fetchThesesWithQuery(apiUrl, query) {
  try {
    const res = await fetch(`${apiUrl}/theses/filter?${query}`);
    const resObj = await res.json();

    return resObj.data;
  } catch (e) {
    return false;
  }
}

export async function fetchNewestTheses(apiUrl) {
  try {
    const res = await fetch(
      `${apiUrl}/theses/filter?sort=upload_date&order=desc`
    );
    const resObj = await res.json();

    if (resObj.data === null) return [];

    return resObj.data;
  } catch (e) {
    return false;
  }
}

export async function getThesesBySearch(apiUrl, name) {
  try {
    const res = await fetch(`${apiUrl}/theses/search?keyword=${name}`);
    const resObj = await res.json();

    if (resObj.data === null) return [];

    return resObj.data;
  } catch (e) {
    return false;
  }
}

export async function fetchThesisBySlug(apiUrl, slug) {
  try {
    const res = await fetch(`${apiUrl}/theses?slug=${slug}`);
    const resObj = await res.json();

    return resObj.data;
  } catch (e) {
    return false;
  }
}

export async function getThesesByUsername(apiUrl, user_name) {
  try {
    const res = await fetch(`${apiUrl}/users/${user_name}/theses`);
    const resObj = await res.json();

    return resObj.data;
  } catch (e) {
    return false;
  }
}

// =========  ADD   =========

export async function addThesisInfor(apiUrl, data, user_id) {
  try {
    const res = await fetch(`${apiUrl}/api/v1/users/${user_id}/theses/infor`, {
      method: "POST",
      headers: {},
      body: JSON.stringify(data),
    });

    const resObj = await res.json();

    return resObj.data.id;
  } catch (e) {
    return false;
  }
}

export async function addFile(apiUrl, file, user_id, thesis_id) {
  const data = new FormData();
  data.append("file", file);

  try {
    const res = await fetch(
      `${apiUrl}/api/v1/users/${user_id}/theses/${thesis_id}/file`,
      {
        method: "POST",
        headers: {},
        body: data,
      }
    );
    const resObj = await res.json();

    return resObj.status;
  } catch (e) {
    return false;
  }
}

export async function addFileAI(apiUrl, file, user_id, thesis_id) {
  const data = new FormData();
  data.append("file", file);

  try {
    const res = await fetch(
      `${apiUrl}/api/v1/users/${user_id}/theses/${thesis_id}/file/ai`,
      {
        method: "POST",
        headers: {},
        body: data,
      }
    );
    const resObj = await res.json();

    return resObj.status;
  } catch (e) {
    return false;
  }
}

// ========= UPDATE =========

export async function updateThesisInfor(apiUrl, data, user_id, thesis_id) {
  try {
    const res = await fetch(
      `${apiUrl}/api/v1/users/${user_id}/theses/${thesis_id}/infor`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const resObj = await res.json();

    return resObj.status;
  } catch (e) {
    return false;
  }
}

// ========= DELETE =========

export async function deleteThesis(apiUrl, user_id, thesis_id) {
  try {
    const res = await fetch(
      `${apiUrl}/api/v1/users/${user_id}/theses/${thesis_id}`,
      {
        method: "DELETE",
      }
    );

    const resObj = await res.json();

    return resObj.status;
  } catch (e) {
    return false;
  }
}

// ========= PATCH =========

export async function patchThesisViews(apiUrl, thesis_id) {
  try {
    const res = await fetch(`${apiUrl}/api/v1/theses/${thesis_id}/views/`, {
      method: "PATCH",
    });

    const resObj = await res.json();

    return resObj.status;
  } catch (e) {
    return false;
  }
}
