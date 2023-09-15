package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
)

func getCount(w http.ResponseWriter, r *http.Request) {
	stringCount := r.FormValue("value")
	iterations, _ := strconv.ParseInt(stringCount, 10, 64)
	count := counter(iterations)
	fmt.Fprintf(w, "Final count is %d", count)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", getCount)
	log.Fatal(http.ListenAndServe(":3000", mux))
}

func counter(n int64) int64 {
	count := int64(0)

	if n > 5000000000 {
		n = 5000000000
	}

	for i := int64(0); i <= n; i++ {
		count += i
	}

	return count
}
