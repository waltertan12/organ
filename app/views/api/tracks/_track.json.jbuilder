json.extract!(
  track,
  :id,
  :name
)
json.created time_ago_in_words track.created_at
json.roll JSON.parse(track.roll)