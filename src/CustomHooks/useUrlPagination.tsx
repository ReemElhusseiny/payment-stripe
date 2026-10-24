/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface UseUrlPaginationOptions {
  defaultPageSize?: number;
}

export function useUrlPagination(options?: UseUrlPaginationOptions) {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultSize = options?.defaultPageSize || 10;

  const urlSearch = searchParams.get("search") || "";
  const urlPage = parseInt(searchParams.get("page") || "1", 10);
  const urlPageSize = parseInt(searchParams.get("paginate") || String(defaultSize), 10);

  const [search, setSearch] = useState<string>(urlSearch);
  const [page, setPage] = useState<number>(urlPage - 1);
  const [pageSize, setPageSize] = useState<number>(urlPageSize);

  useEffect(() => {
    const p = parseInt(searchParams.get("page") || "1", 10);
    const s = parseInt(searchParams.get("paginate") || String(defaultSize), 10);
    const q = searchParams.get("search") || "";

    if (p - 1 !== page) setPage(p - 1);
    if (s !== pageSize) setPageSize(s);
    if (q !== search) setSearch(q);
  }, [searchParams]);

  // التأثير الثاني: الكتابة في الـ URL (من الـ State إلى الـ URL)
  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);

    const nextPage = (page + 1).toString();
    const nextPaginate = pageSize.toString();

    if (
      currentParams.page !== nextPage ||
      currentParams.paginate !== nextPaginate ||
      (currentParams.search || "") !== search
    ) {
      const newParams: Record<string, string> = {
        ...currentParams,
        page: nextPage,
        paginate: nextPaginate,
      };

      if (search.trim()) {
        newParams.search = search;
      } else {
        delete newParams.search;
      }

      setSearchParams(newParams);
    }
  }, [page, pageSize, search]);
const updateUrlParams = (newFilters: Record<string, string | null>) => {
    const currentParams = Object.fromEntries([...searchParams]);
    
    const nextParams: Record<string, string> = {
      ...currentParams,
      ...newFilters,
      page: '1' // 🌟 حركة المحترفين: أي فلتر جديد يرجع تلقائياً لصفحة 1
    };

    // تنظيف الحقول اللي بقيت بـ فاضي أو null (عشان الـ URL يفضل نظيف)
    Object.keys(nextParams).forEach(key => {
      if (nextParams[key] === "" || nextParams[key] === null || nextParams[key] === undefined) {
        delete nextParams[key];
      }
    });

    setSearchParams(nextParams);
  };
  // بنرجع كل الـ states والدوال اللي أي جدول أو Hook تاني هيحتاجها
  return {
    page,
    setPage,
    pageSize,
    setPageSize,
    search,
    setSearch,
    searchParams,
    setSearchParams,
    updateUrlParams
  };
}