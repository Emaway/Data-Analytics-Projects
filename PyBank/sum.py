my_list= [2,4,6,8,10,12]

def total(numbers):
#length of numbers
    number_of_numbers = len (numbers)
    sum = 0.0
    for num in numbers:
        sum = sum + num
    return sum 

print(total(my_list))