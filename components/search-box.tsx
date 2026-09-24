"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useQueryState } from "nuqs";
import type { SubmitEventHandler } from "react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

const QUERY_NAME = "q";

export default function Search() {
  const [query, setQuery] = useQueryState(QUERY_NAME, { shallow: false });

  const handleSearch: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get("query") as string;
    setQuery(value || null);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-1 w-full max-w-100">
      <InputGroup className="max-w-xs">
        <InputGroupInput
          name="query"
          placeholder="Query..."
          defaultValue={query ?? ""}
        />
        <InputGroupAddon>
          <MagnifyingGlassIcon className="w-4" />
        </InputGroupAddon>
      </InputGroup>

      <section className="flex gap-1">
        <Button type="submit">Search</Button>
        <Button
          variant="outline"
          type="reset"
          onClick={() => {
            setQuery(null);
          }}
        >
          Clear
        </Button>
      </section>
    </form>
  );
}
