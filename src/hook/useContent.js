import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export function useContent() {
  const [content, setContent] = useState({})

  useEffect(() => {
    supabase.from("content").select("*").then(({ data }) => {
      const map = {}
      data?.forEach(row => {
        if (!map[row.section]) map[row.section] = {}
        map[row.section][row.key] = row.value
      })
      setContent(map)
    })
  }, [])

  return content
}