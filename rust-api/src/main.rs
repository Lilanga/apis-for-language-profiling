use serde::{Serialize, Deserialize};
use std::collections::HashMap;
use warp::Filter;

#[derive(Serialize)]
pub struct GenericResponse {
    pub status: String,
    pub message: String,
}

#[derive(Serialize, Deserialize)]
struct QueryParams {
    value: String,
}

fn counter(n: u128) ->u128{
    let mut count = 0;
    let mut i = 0;
    let mut range = n;

    if range>5000000000 { range = 5000000000; }

    while i <= range {
        count += i;
        i+=1;
    }

    return count;
}

#[tokio::main]
async fn main() {
    let counters = warp::get()
        .and(warp::query::<HashMap<String, String>>())
        .map(|p: HashMap<String, String>| match p.get("value") {
            Some(count) => Ok(format!("Final count is {}", counter(count.trim().parse::<u128>().unwrap())).into()),
            None => Ok(format!("No query string found")),
        });

    println!("🚀 Server started successfully");
    warp::serve(counters).run(([0, 0, 0, 0], 3000)).await;
}
