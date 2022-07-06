import { Box, Button, makeStyles } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import { getThesesBySearch } from "modules/theses/fetch-theses";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SearchSuggestedItem from "./SearchSuggestedItem";

export default function NavSearchBar() {
  const mui = useStyles();
  const router = useRouter();
  const [stateValue, setStateValue] = useState("");
  const [rows, setRows] = useState([]);

  function handleChange(value) {
    value ? setStateValue(value.trim()) : setStateValue("");
  }

  function handleSearch() {
    if (stateValue) {
      router.push({
        pathname: "/search",
        query: { q: stateValue.trim() },
      });
      setStateValue("");
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (stateValue) {
        setRows([]);

        const query = {
          name: stateValue,
          limit: 3,
        };

        const data = await getThesesBySearch(
          process.env.NEXT_PUBLIC_NEXT_PUBLIC_API_URL,
          new URLSearchParams(query).toString()
        );
        setRows(data);
      }
    }
    const timer = setTimeout(() => {
      fetchData();
    }, 1500);

    return () => clearTimeout(timer);
  }, [stateValue]);

  return (
    <div className={mui.root}>
      <SearchBar
        value={stateValue}
        placeholder="Tìm tên đề tài"
        onChange={handleChange}
        onRequestSearch={handleSearch}
        onCancelSearch={handleChange}
        className={mui.searchbar}
      />

      {
        //
        stateValue && (
          <Box className={mui.suggestion}>
            {
              //
              rows.length === 0 ? (
                <p style={{ textAlign: "center" }}>
                  Không tìm thấy luận văn phù hợp
                </p>
              ) : (
                <>
                  {
                    //
                    rows.slice(0, 3).map((item) => (
                      <SearchSuggestedItem
                        key={item.id}
                        details={item}
                        handleChange={handleChange}
                      />
                    ))
                  }

                  <Button
                    size="small"
                    fullWidth
                    className={mui.watchall}
                    onClick={handleSearch}
                  >
                    Xem tất cả
                  </Button>
                </>
              )
            }
          </Box>
        )
      }
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    margin: "0 15px",
  },

  searchbar: {
    width: "100%",
    maxWidth: 400,
    padding: 0,
    height: 35,

    "& input": {
      fontSize: "0.9rem",
    },
  },

  suggestion: {
    position: "absolute",
    top: 35,
    maxWidth: 400,
    width: "100%",
    borderRadius: 5,
    boxShadow: "3px 3px 2px 0 rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    backgroundColor: "#fff",
  },

  watchall: {
    borderTop: "0.5px solid rgba(0,0,0,0.1)",
  },
}));
