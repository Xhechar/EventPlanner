use xplana

delete from events where event_id = '924b131c-263e-4bb4-af24-a679d1753c4d'

select * from events where createdAt = DATEADD(day, 3, GETDATE()) AND isDeleted = 0

--79a07d2b-8e81-40bf-bfe3-7bfad7bc970b